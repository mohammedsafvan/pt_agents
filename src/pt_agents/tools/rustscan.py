import subprocess
from crewai_tools import tool
import os


def load_file(file_path):
    with open(file_path, "r") as file:
        return file.read()


RUSTSCAN_DOCS = load_file(
    os.path.join(str("/".join(__file__.split("/")[:-1])), "assets/rustscan_docs.md")
)


@tool("RustScan")
def rustscan(
    addresses: str,
    # ports: Union[str, None] = None,
    # range_ports: Union[str, None] = None,
    # exclude_ports: Union[str, None] = None,
    # batch_size: int = 4500,
    # timeout: int = 1500,
    # tries: int = 1,
    # ulimit: Union[int, None] = None,
    # greppable: bool = False,
    # no_config: bool = False,
    # accessible: bool = False,
    # top_ports: bool = False,
    # scan_order: str = "serial",
    # command: Union[str, None] = None,
):
    """
    Perform a RustScan scan on specified addresses and ports.

    **Parameters:**
    - `addresses` (str, required):
        - A comma-separated list of addresses or hosts to scan (e.g., "192.168.0.1,example.com").

    **Returns:**
    - `str`: The result of the RustScan process or an error message if the scan fails.

    **Usage Notes:**
    - At least the `addresses` parameter must be provided.
    - `ports` and `range_ports` are mutually exclusive; provide only one.
    - Ensure proper permissions and system limits (e.g., `ulimit`) for optimal performance.
    """
    rustscan_path = os.path.join(os.path.dirname(__file__), "rustscan")
    print(rustscan_path)
    if not os.path.isfile(rustscan_path):
        raise FileNotFoundError(f"rust scan not found in {rustscan_path}")
    base_command = f"{rustscan_path} -a {addresses}"

    # if ports:
    #     base_command += f" -p {ports}"
    # if range_ports:
    #     base_command += f" -r {range_ports}"
    # if exclude_ports:
    #     base_command += f" -e {exclude_ports}"
    # if batch_size:
    #     base_command += f" -b {batch_size}"
    # if timeout:
    #     base_command += f" -t {timeout}"
    # if tries:
    #     base_command += f" --tries {tries}"
    # if ulimit:
    #     base_command += f" -u {ulimit}"
    # if greppable:
    #     base_command += " -g"
    # if no_config:
    #     base_command += " -n"
    # if accessible:
    #     base_command += " --accessible"
    # if top_ports:
    #     base_command += " --top"
    # if scan_order:
    #     base_command += f" --scan-order {scan_order}"
    # if command:
    #     base_command += f" -- {command}"

    # Execute the command using subprocess
    process = subprocess.Popen(
        base_command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE
    )
    stdout, stderr = process.communicate()

    if process.returncode != 0:
        raise Exception(f"Error executing RustScan: {stderr.decode('utf-8')}")

    return stdout.decode("utf-8")


@tool("RustScanDocs")
def rustscan_docs() -> str:
    """
    Grab the entire RustScan documentation

    Returns:
    - str: Latest RustScan documentation with examples
    """
    rustscan_path = os.path.join(os.path.dirname(__file__), "rustscan")
    if not os.path.isfile(rustscan_path):
        raise FileNotFoundError(f"rust scan not found in {rustscan_path}")
    process = subprocess.Popen(
        f"{rustscan_path} -h",
        shell=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    stdout, stderr = process.communicate()

    if process.returncode != 0:
        raise Exception(f"Error executing RustScan: {stderr.decode('utf-8')}")

    help_output = (
        f"# RustScan Help Output\n\n```{stdout.decode('utf-8')}```\n\n{RUSTSCAN_DOCS}"
    )

    return help_output
