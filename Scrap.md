---
## Server and Client Program Report

This report details the functionality, testing, and potential improvements for the provided `server.py` and `client.py` programs.

---
## 1. Code Description

**Overview:**

The provided Python code implements a simple client-server application for file sharing and server status monitoring.

**Client Capabilities:**
* Request file list
* Download files
* Check connection status
* Send arbitrary messages (ACK response)
* Graceful disconnection

---
### Server Program (`server.py`) Description: Initialization

* **Imports:** 
*  socket
* threading
* datetime
* os
* **Configuration Constants:**
    * `HOST`: '127.0.0.1' (localhost)
    * `PORT`: 12345
    * `MAX_CLIENTS`: 3
    * `FILE_REPO`: "./files"
* **In-memory Data Structures:**
    * `client_cache`: Client connection details (start, end time).
    * `connected_clients`: Set of connected client names.
    * `client_counter`: Unique client name assignment.
    * `lock`: Threading lock for thread-safe access.

---
### Server Program (`server.py`) Description: `handle_client()`

* **Threaded Function:** Executed per client for concurrency.
* **Client Tracking:** Stores `start_time` in `client_cache`, adds `client_name` to `connected_clients`.
* **Message Loop:** Receives and processes client messages.
* **Message Processing:**
    * `"exit"`: Goodbye & disconnect.
    * `"status"`: Client connection status report from `client_cache`.
    * `"list"`: Lists files from `FILE_REPO` with formatted sizes.
    * `"get <filename>"`: File download - sends "START", file chunks, "END".
    * Default:  `<message> ACK` response.
* **Error Handling:** `try...except` for client handling errors.
* **Disconnection:** Updates `end_time` in `client_cache`, closes socket, removes client from `connected_clients`.

---
### Server Program (`server.py`) Description: `start_server()`

* **Socket Creation & Binding:** Creates server socket, binds to `HOST` and `PORT`.
* **Listening:** Listens for up to `MAX_CLIENTS`.
* **Client Acceptance Loop:** Continuously accepts client connections.
* **Client Handling:**
    * **Max Client Check:** Rejects connections if `MAX_CLIENTS` reached.
    * **Client Naming:** Assigns unique `client_name`.
    * **Thread Creation:** Starts `handle_client` in a new thread.

---
### Client Program (`client.py`) Description: Initialization & `start_client()`

* **Imports:** `socket`, `os`, `sys`, `tqdm`.
* **Server Constants:** `HOST`, `PORT`.
* **`start_client()` Function:**
    * **Socket Creation & Connection:** Connects to server.
    * **Server Full Check:** Handles "Server full" response.
    * **Connection Confirmation:** Prints "Connected as <client_name>".
    * **Message Input Loop:** Prompts user for messages.
    * **Message Sending:** Sends message to server.

---
### Client Program (`client.py`) Description: Response Handling

* **Exit Command:** `"exit"` - Disconnects.
* **Server Response Reception:** Receives server responses.
* **File Download ("START" signal):**
    * Extracts `file_size`, `filename`.
    * Opens file for writing.
    * Uses `tqdm` progress bar.
    * Receives file chunks until "END" signal.
    * Writes chunks to file.
    * Prints "File received successfully."
* **Other Responses:** Prints "Server: ".
* **Error Handling:** `try...except` for connection errors.
* **Socket Closure:** `finally` block ensures socket closure.

---

### Operation Summary

1. **Server Start:** Run `server.py` (listens on `127.0.0.1:12345`).
2. **Client Start:** Run `client.py` (connects to server, gets client name).
3. **Client Commands:**
    * `status`: Server status.
    * `list`: File list.
    * `get <filename>`: File download.
    * `exit`: Disconnect.
    * Other: "ACK" response.
4. **Server Processing:** Handles commands, sends responses.
5. **Concurrency:** Server handles up to `MAX_CLIENTS` concurrently.

---
### Special Considerations

* **Threading:** Concurrent client handling.
* **File Transfer:** "START/END" signals, progress bar.
* **In-memory Cache:** `client_cache` for client tracking.
* **File Repository:** `./files` directory for shared files (manual creation needed).
* **Error Handling:** Basic error management.
* **Concurrency Control:** `threading.Lock()` for thread safety.

---
## 2. Difficulties Faced and How They Were Handled

**No significant difficulties encountered in code analysis.** Code is well-structured and commented.

**Potential Development Difficulties & Handling:**

* **Thread Safety & Race Conditions:**
    * **Handling:** `threading.Lock()` used for shared resources.
* **File Transfer Reliability:**
    * **Handling:** "START/END" signals, chunking, file size pre-send.
* **Error Handling & Robustness:**
    * **Handling:** Basic `try...except` blocks. More specific handling possible.
* **Client Management & Tracking:**
    * **Handling:** `client_cache` & `connected_clients` for in-memory tracking.

---
## 3. Test Results

**Test Setup:**
6. Created `files` directory.
7. Created `test1.txt`, `test2.txt`, `large_file.txt` ( > 1MB).
8. Started `server.py`.
9. Started multiple `client.py` instances.

---
### Test Case 3.1: Basic Connection and Client Naming

**Objective:** Verify client connection and unique naming.
**Steps:** Start server, then 3 clients.
**Expected:** Clients connect, get names (Client01, Client02, Client03). Server console shows connections.

**Screenshot 3.1:**

**Server Console:**


- Concurrent Client Handling:
- Client Connection Management:
- Unique Client Identification:
- Client Status Reporting:
- File Listing:
- File Serving:
- Basic Command Acknowledgement:
- Graceful Client Disconnection: