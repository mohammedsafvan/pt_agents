import asyncio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from crews.crew_manager import kickoff_crew

app = FastAPI(title="PT-agents")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def ping():
    return {"Hello": "World"}


@app.post("/test")
async def test():
    # This is only for frontend mocking
    data = {
        "result": {
            "description": "Convert the provided plain text document into a well-formatted Markdown document. The text includes several sections such as headers, lists, code snippets, and tables. Your task is to apply Markdown syntax appropriately to enhance readability and structure. Ensure that headers are clearly defined, lists are properly bulleted or numbered, code snippets are enclosed in code blocks, and tables are correctly formatted. The document should be ready for publishing on a professional platform.1. The Markdown Converter will receive the plain text report from the Report Writer (output from Task 2).\n2. The Markdown Converter will process the plain text report, identifying headers, lists, code snippets, and tables.\n3. The Markdown Converter will apply appropriate Markdown syntax to each identified element:\n   - Headers: Use '#' symbols to define headers (e.g., # Header 1, ## Header 2).\n   - Lists: Use '*' or '-' for bulleted lists and numbers for numbered lists.\n   - Code Snippets: Enclose code snippets within backticks (`) or triple backticks (```).\n   - Tables: Use the Markdown table syntax to create tables with rows and columns.\n4. The Markdown Converter will ensure that the final Markdown document is well-formatted, visually organized, and maintains the semantic structure of the original text. Ensure best practices are followed and maintain clearness.\n5. The Markdown Converter will output the raw Markdown formatted document for direct frontend consumption.",
            "name": None,
            "expected_output": "A raw Markdown formatted document with distinct sections for headers, lists, code blocks, and tables. The document should follow Markdown best practices, be visually organized, and maintain the semantic structure of the original text. Ensure the final document is suitable for professional publication and meets the standards of clarity and accessibility.Formatted as markdown without '```' for direct frontend consumption",
            "summary": "Convert the provided plain text document into a well-formatted Markdown...",
            "raw": """# Cybersecurity Vulnerability Assessment Report: scanme.nmap.org

This report details the findings of a comprehensive cybersecurity vulnerability assessment conducted on scanme.nmap.org. The assessment aimed to identify potential security weaknesses that could be exploited by malicious actors. The scan revealed several open ports and potential vulnerabilities associated with the services running on those ports. This report outlines these findings, provides a risk and impact analysis, and recommends actionable mitigation strategies to enhance the security posture of the target host. The intended audience for this report includes both technical staff and non-technical stakeholders.

## Executive Summary

The vulnerability assessment of scanme.nmap.org identified three open ports: 22 (SSH), 80 (HTTP), and 31337 (elite). Potential vulnerabilities were detected in the SSH and HTTP services. Specifically, the versions of OpenSSH and Apache httpd running on the target host are susceptible to known security flaws. An unknown service running on port 31337 requires further investigation to determine its purpose and potential risks. The overall severity of the identified vulnerabilities is rated as **medium**, necessitating prompt implementation of the recommended mitigation strategies to prevent potential exploitation.

## Target Host Information

The target host, scanme.nmap.org, was assessed for vulnerabilities. Key details are as follows:

- **Target:** scanme.nmap.org
- **IP Address:** 45.33.32.156 (IPv4), 2600:3c01::f03c:91ff:fe18:bb2f (IPv6)
- **Operating System:** Likely Linux (Kernel 5.x or 4.x), OS detection was unreliable due to filtered ports.

## Open Ports and Services

The following table summarizes the open ports and services identified during the scan:

| Port  | Protocol | Service | Version                                         |
| :---- | :------- | :------ | :---------------------------------------------- |
| 22    | TCP      | SSH     | OpenSSH 7.6p1 Ubuntu 4ubuntu0.7                 |
| 80    | TCP      | HTTP    | Apache httpd 2.4.29 ((Ubuntu))                 |
| 31337 | TCP      | elite   | syn-wait (Potentially a custom or unknown service) |

## Vulnerability Descriptions

The following sections provide detailed descriptions of the identified vulnerabilities:

### 1. OpenSSH 7.6p1 Vulnerabilities (Port 22)

- **Description:** OpenSSH versions prior to 7.7 are susceptible to multiple vulnerabilities. While specific exploits targeting version 7.6p1 may vary, common risks associated with older SSH versions include potential weaknesses in key exchange algorithms, cipher suites, and user authentication mechanisms. Absence of the latest patches can expose the system to known exploits.
- **CVE IDs:** (Search on NVD or Exploit-DB for specific CVEs related to OpenSSH 7.6)
- **Severity:** Medium

### 2. Apache httpd 2.4.29 Vulnerabilities (Port 80)

- **Description:** Apache httpd 2.4.29 is vulnerable to several security flaws. A common vulnerability is related to how Apache handles requests, potentially leading to denial-of-service (DoS) attacks or information disclosure. Additionally, outdated versions of Apache might lack security patches for known vulnerabilities.
- **CVE IDs:** (Search on NVD or Exploit-DB for specific CVEs related to Apache 2.4.29)
- **Severity:** Medium

### 3. Unknown Service (Port 31337)

- **Description:** The service running on port 31337 is identified as "elite syn-wait," suggesting it may be a custom or less common application. Without further investigation, it's impossible to determine specific vulnerabilities. However, any custom service should be treated with caution, as it may not have undergone rigorous security testing.
- **CVE IDs:** N/A (Service not recognized)
- **Severity:** Medium (Requires further investigation)

## Risk and Impact Analysis

The following table summarizes the risk and potential impact associated with each identified vulnerability:

| Vulnerability             | Risk                                                                                                 | Impact                                                              | Likelihood        |
| :------------------------ | :--------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------ | :---------------- |
| OpenSSH Vulnerabilities   | Exploitation could allow unauthorized remote access, leading to data breaches and system compromise. | High. Full system compromise is possible.                           | Medium            |
| Apache httpd Vulnerabilities | Exploitation could lead to denial-of-service attacks, information disclosure, or remote code execution. | Medium. Potential for data breaches or service disruption.           | Medium            |
| Unknown Service (31337)   | Uncertain risk. Could be a backdoor or a vulnerable application.                                  | Unknown. Could range from informational disclosure to full compromise. | Low to Medium     |

## Mitigation Recommendations

The following table provides actionable recommendations for mitigating the identified vulnerabilities:

| Vulnerability             | Mitigation                                                                                                                              | Justification                                                                                                                                                   |
| :------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| OpenSSH Vulnerabilities   | 1. Upgrade to the latest stable version of OpenSSH. 2. Apply all security patches. 3. Harden SSH configuration (disable password authentication, enforce key-based authentication). 4. Review `/etc/ssh/sshd_config`. | Resolves known vulnerabilities, reduces the attack surface, and enhances security through key-based authentication.                                     |
| Apache httpd Vulnerabilities | 1. Upgrade to the latest stable version of Apache httpd. 2. Apply all security patches. 3. Disable unnecessary modules. 4. Implement a Web Application Firewall (WAF).                                             | Resolves known vulnerabilities, reduces the attack surface, and provides protection against common web attacks.                                          |
| Unknown Service (31337)   | 1. Investigate the service to identify the application. 2. Perform a security assessment. 3. Restrict access to trusted networks or hosts. 4. Monitor traffic for suspicious activity.                               | Understanding the service is crucial to assessing its risk. Restricting access limits the potential for exploitation, and monitoring helps detect anomalies. |

## Newly Identified Threats Spotlight

The unknown service running on port 31337 poses a unique and potentially significant threat. The inability to immediately identify the service means its purpose and vulnerabilities are unknown, making it crucial to prioritize its investigation.

**Warning:** The unknown service could be a backdoor, a deliberately planted vulnerability, or a misconfigured application. **Immediate action is required** to determine its function and potential risks.

## Comparative Analysis Against Industry Benchmarks

Comparing the current security posture against industry benchmarks reveals areas for improvement. For example, CIS benchmarks for SSH and Apache recommend specific configuration settings and patching levels. The identified vulnerabilities indicate deviations from these best practices, highlighting the need for remediation to align with industry standards.

| Area               | Current Status                                       | Industry Benchmark                                  | Recommendation                                                                |
| :----------------- | :--------------------------------------------------- | :-------------------------------------------------- | :---------------------------------------------------------------------------- |
| OpenSSH Version    | 7.6p1                                                | Latest stable version                               | Upgrade to the latest stable version of OpenSSH                               |
| Apache httpd Version | 2.4.29                                               | Latest stable version                               | Upgrade to the latest stable version of Apache httpd                              |
| SSH Configuration  | Default configuration (potentially weak)             | CIS benchmark recommendations                       | Review and harden SSH configuration based on CIS benchmark recommendations |
| Apache Modules     | Potentially unnecessary modules enabled               | Minimal set of required modules                     | Disable any Apache modules that are not required                                |

## Conclusion

This vulnerability assessment revealed potential security risks associated with the OpenSSH and Apache httpd services running on scanme.nmap.org, as well as an unknown service. Implementing the recommended mitigation strategies will significantly improve the security posture of the target host. Prioritize the upgrade of OpenSSH and Apache httpd, harden SSH configurations, and thoroughly investigate the unknown service on port 31337. Regular vulnerability assessments should be conducted to continuously monitor and improve the security of the system. Specifically, the next steps are:

1.  Isolate port 31337
2.  Upgrade OpenSSH and Apache
3.  Run another scan to verify the changes.""",
            "pydantic": None,
            "json_dict": None,
            "agent": "Markdown Converter",
            "output_format": "raw",
        }
    }
    await asyncio.sleep(3)
    return data


@app.post("/kickoff")
async def kickoff(host: str = "http://scanme.nmap.org/"):
    result = kickoff_crew(host)
    return {"result": result.tasks_output[-1]}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app)
