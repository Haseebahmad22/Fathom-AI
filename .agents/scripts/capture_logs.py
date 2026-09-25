import os
import sys
import json
import re
import datetime

# Ensure stdout uses UTF-8
if sys.stdout.encoding and sys.stdout.encoding.lower() != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

DEFAULT_APP_DATA = r"C:\Users\dell\.gemini\antigravity-ide"
BRAIN_DIR = os.path.join(DEFAULT_APP_DATA, "brain")

WORKSPACE_DIRS = [
    r"c:\Users\dell\Desktop\FathomAi",
    r"c:\Users\dell\Desktop\FathomAi\Fathom-AI"
]

DEFAULT_AUTHOR = "Haseebahmad22"
DEFAULT_PROJECT = "fathom-ai"
DEFAULT_MODEL = "Gemini 3.8 Flash (Medium)"
DEFAULT_TOOL = "Antigravity IDE"

def parse_iso_datetime(dt_str):
    if not dt_str:
        return datetime.datetime.now(datetime.timezone.utc)
    clean_str = dt_str.replace("Z", "+00:00")
    try:
        return datetime.datetime.fromisoformat(clean_str)
    except Exception:
        return datetime.datetime.now(datetime.timezone.utc)

def extract_prompt_text(raw_content):
    if not raw_content:
        return ""
    # Extract prompt inside <USER_REQUEST>...</USER_REQUEST> if present
    match = re.search(r"<USER_REQUEST>(.*?)</USER_REQUEST>", raw_content, re.DOTALL)
    if match:
        text = match.group(1)
        return text.strip("\r\n")
    return raw_content.strip("\r\n")

def is_project_session(conv_id, transcript_path):
    if conv_id == "390cedd2-a382-41b3-94b0-ec388a8468f8":
        return True
    try:
        with open(transcript_path, "r", encoding="utf-8", errors="replace") as f:
            for _ in range(50):
                line = f.readline()
                if not line:
                    break
                line_lower = line.lower()
                if "fathom" in line_lower or "fathomai" in line_lower or "8x assignment" in line_lower or "capture test" in line_lower:
                    return True
    except Exception:
        pass
    return False

def process_transcript(conv_id, transcript_path):
    if not os.path.exists(transcript_path):
        return None

    if not is_project_session(conv_id, transcript_path):
        return None

    steps = []
    try:
        with open(transcript_path, "r", encoding="utf-8", errors="replace") as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                try:
                    steps.append(json.loads(line))
                except Exception:
                    pass
    except Exception as e:
        sys.stderr.write(f"Error reading {transcript_path}: {e}\n")
        return None

    if not steps:
        return None

    # Group into turns
    turns = []
    current_turn = None

    for step in steps:
        source = step.get("source")
        stype = step.get("type")
        content = step.get("content")
        created_at = step.get("created_at")

        if source == "USER_EXPLICIT" and stype == "USER_INPUT":
            if current_turn:
                turns.append(current_turn)
            prompt_text = extract_prompt_text(content)
            current_turn = {
                "num": len(turns) + 1,
                "prompt": prompt_text,
                "prompt_time": created_at,
                "response": None,
                "response_time": None,
                "model": DEFAULT_MODEL
            }
        elif current_turn is not None:
            # Look for model responses
            if source == "MODEL" and stype == "PLANNER_RESPONSE" and content:
                current_turn["response"] = content.strip("\r\n")
                current_turn["response_time"] = created_at
            elif step.get("modelName") and step.get("modelName") != "auto":
                current_turn["model"] = step.get("modelName")

    if current_turn:
        turns.append(current_turn)

    if not turns:
        return None

    first_prompt_time_str = turns[0]["prompt_time"] or datetime.datetime.now(datetime.timezone.utc).isoformat()
    last_prompt_time_str = turns[-1]["prompt_time"] or first_prompt_time_str
    
    first_dt = parse_iso_datetime(first_prompt_time_str)
    date_str = first_dt.strftime("%Y-%m-%d")
    time_prefix = first_dt.strftime("%Y-%m-%d_%H-%M-%S")
    filename = f"{time_prefix}_{conv_id}.md"

    short_session_id = conv_id[:8]

    # Build markdown document matching 8x format
    frontmatter = [
        "---",
        f"session_id: {conv_id}",
        f"date: {date_str}",
        f"author: {DEFAULT_AUTHOR}",
        f"model: {DEFAULT_MODEL}",
        f"tool: {DEFAULT_TOOL}",
        f"project: {DEFAULT_PROJECT}",
        f"total_exchanges: {len(turns)}",
        f"first_prompt_time: {first_prompt_time_str}",
        f"last_prompt_time: {last_prompt_time_str}",
        "---",
        "",
        f"# Session Log - {date_str}",
        "",
        f"Session: `{short_session_id}` | Project: `{DEFAULT_PROJECT}` | Author: `{DEFAULT_AUTHOR}`",
        "",
        "---",
        ""
    ]

    body = []
    for turn in turns:
        t_num = turn["num"]
        p_time = turn["prompt_time"] or first_prompt_time_str
        t_model = turn["model"] or DEFAULT_MODEL
        p_text = turn["prompt"]

        body.append(f"[LOG_ENTRY type=PROMPT num={t_num} session={short_session_id}]")
        body.append(f"timestamp: {p_time}")
        body.append(f"model: {t_model}")
        body.append("")
        body.append(p_text)
        body.append("")

        if turn["response"] is not None:
            r_time = turn["response_time"] or p_time
            r_text = turn["response"]
            body.append(f"[LOG_ENTRY type=RESPONSE num={t_num} session={short_session_id}]")
            body.append(f"timestamp: {r_time}")
            body.append(f"model: {t_model}")
            body.append("")
            body.append(r_text)
            body.append("")

    full_md = "\n".join(frontmatter + body)

    # Write to target directories
    for ws in WORKSPACE_DIRS:
        logs_dir = os.path.join(ws, ".agent-logs")
        try:
            os.makedirs(logs_dir, exist_ok=True)
            out_file = os.path.join(logs_dir, filename)
            with open(out_file, "w", encoding="utf-8") as f:
                f.write(full_md)
        except Exception as e:
            sys.stderr.write(f"Error writing log to {logs_dir}: {e}\n")

    return filename

def sync_all():
    target_conv_id = None
    target_transcript_path = None

    if "--stdin" in sys.argv:
        try:
            stdin_data = sys.stdin.read()
            if stdin_data:
                payload = json.loads(stdin_data)
                target_conv_id = payload.get("conversationId")
                target_transcript_path = payload.get("transcriptPath")
        except Exception as e:
            sys.stderr.write(f"Error parsing stdin: {e}\n")

    if target_conv_id and target_transcript_path and os.path.exists(target_transcript_path):
        res = process_transcript(target_conv_id, target_transcript_path)
        if res:
            sys.stderr.write(f"Processed session {target_conv_id} -> {res}\n")
    else:
        # Scan brain directory for sessions active in last 48 hours
        if os.path.exists(BRAIN_DIR):
            for entry in os.scandir(BRAIN_DIR):
                if entry.is_dir():
                    t_full = os.path.join(entry.path, ".system_generated", "logs", "transcript_full.jsonl")
                    if os.path.exists(t_full):
                        mtime = os.path.getmtime(t_full)
                        if (datetime.datetime.now().timestamp() - mtime) < 172800:
                            res = process_transcript(entry.name, t_full)
                            if res:
                                sys.stderr.write(f"Processed session {entry.name} -> {res}\n")

    print(json.dumps({"decision": "allow", "status": "ok"}))

if __name__ == "__main__":
    sync_all()
