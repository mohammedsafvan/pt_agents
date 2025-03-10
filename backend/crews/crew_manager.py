from crewai import Agent, Task, Crew, Process, LLM
from dotenv import load_dotenv
import os

from .tools import rustscan

load_dotenv("../../.env")

os.environ["OPENAI_API_KEY"] = (
    "dummy_key"  # Don't know why, crew ai just throwing validation error for OPENAI_API_KEY; So setting a dummpy one
)

agents_config = "config/agents.yaml"
tasks_config = "config/tasks.yaml"

llm = LLM(
    model="gemini/gemini-2.0-flash",
)


def create_crew(host: str):
    # Agents
    network_penetration_tester = Agent(
        role="Network Penetration Tester",
        goal="Execute advanced penetration tests to uncover network vulnerabilities using sophisticated techniques and tools.",
        backstory="As an expert network penetration tester, you specialize in simulating cyber attacks on networks to identify vulnerabilities before they can be exploited maliciously. With a deep understanding of security frameworks and tools, you have successfully fortified numerous enterprise networks against potential threats. Your analytical skills and strategic approach have earned you recognition in the cybersecurity community, and you continue to stay ahead of the curve by mastering emerging technologies and methodologies.",
        llm=llm,
        verbose=True,
        tools=[rustscan.rustscan_docs, rustscan.rustscan],
    )
    writer_agent = Agent(
        role="Report Writer",
        goal="Given some content/research, craft a nice, concise, informative, report detailing the fidnings in the research. The report most be in MarkDown and, if need be, each source should be cited in a biography",
        backstory="A skilled Report Writer with a passion for writing the best Reports given the content/research presented to them",
        verbose=True,
        allow_delegation=False,
        llm=llm,
        # tools=[helpers.current_utc_timestamp],
    )
    make_markdown_agent = Agent(
        role="Markdown Converter",
        goal="Convert plain text into well-formatted Markdown, ensuring clean and professional documentation style.",
        backstory=(
            "As a Markdown conversion expert, you have a knack for transforming plain text into beautifully formatted Markdown. "
            "Your skill goes beyond mere conversion; you elevate plain text into an art form, creating Markdown that is not only "
            "functional but also aesthetically pleasing. You pride yourself on your ability to present complex information in an "
            "organized and engaging manner."
        ),
        verbose=True,
        llm=llm,
    )

    # Tasks
    build_cybersecurity_report = Task(
        description=(
            "Generate a comprehensive report on the recent cybersecurity scan results. "
            "This report should incorporate external research and web-based findings to "
            "evaluate detected vulnerabilities, compare them with industry standards, and "
            "recommend mitigation strategies based on current best practices. Highlight any "
            "threats identified and discuss their potential impacts. The report should be "
            "clear and accessible to both technical and non-technical stakeholders."
        ),
        agent=writer_agent,
        expected_output=(
            "A detailed report consisting of 10 to 20 paragraphs, covering in-depth analysis of "
            "cybersecurity vulnerabilities, comparative industry insights, and mitigation strategies. "
            "The report should be written in plain text, ensuring clarity and accessibility for a "
            "diverse audience. It should also feature a section on newly identified threats and "
            "their potential impacts."
        ),
    )

    convert_report_to_markdown = Task(
        description=(
            "Transform the given plain text into a well-structured Markdown document, enhancing readability "
            "with appropriate formatting. Ensure the following: "
            "- **Headers**: Clearly define sections using Markdown headers (`#`, `##`, `###`)."
            "- **Lists**: Use bullet points (`-`, `*`) or numbered lists (`1.`, `2.`) where applicable."
            "- **Code Blocks**: Format code snippets using triple backticks (```) with proper syntax highlighting."
            "- **Tables**: Present structured data using Markdown tables for better visualization."
            "- **Emphasis**: Use bold (`**bold**`) or italics (`*italics*`) for important points."
            "Ensure the document is **concise yet visually organized**, making it suitable for professional publication."
        ),
        agent=make_markdown_agent,
        expected_output=(
            "A Markdown document that is **structured, visually engaging, and professionally formatted**. "
            "Headers, lists, tables, and code blocks should be used effectively to **enhance clarity** while "
            "keeping the content **concise**. The output should maintain the semantic integrity of the original "
            "text while improving its visual appeal."
        ),
        output_file="output.md",
    )

    port_scanning_task = Task(
        description=f'Scan the host "{host}" using RustScan',
        expected_output="The relevant details from the results of the RustScan or an error message.",
        agent=network_penetration_tester,
    )
    crew = Crew(
        tasks=[
            port_scanning_task,
            build_cybersecurity_report,
            convert_report_to_markdown,
        ],
        agents=[network_penetration_tester, writer_agent, make_markdown_agent],
        process=Process.sequential,
        verbose=True,
        memory=True,
        cache=True,
        planning=True,
        planning_llm=llm,
    )
    return crew


def kickoff_crew(host: str):
    crew = create_crew(host)
    return crew.kickoff()
