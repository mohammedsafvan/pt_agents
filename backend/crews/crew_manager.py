from crewai import Agent, Task, Crew, Process, LLM
from dotenv import load_dotenv
import os

from .tools import rustscan

load_dotenv("../../.env")

os.environ["OPENAI_API_KEY"] = (
    "dummy_key"  # Don't know why, crew ai just throwing validation error for OPENAI_API_KEY; So setting a dummpy one
)

llm = LLM(
    model="gemini/gemini-1.5-flash",
)


def create_crew():
    network_penetration_tester = Agent(
        role="Network Penetration Tester",
        goal="Execute advanced penetration tests to uncover network vulnerabilities using sophisticated techniques and tools.",
        backstory="As an expert network penetration tester, you specialize in simulating cyber attacks on networks to identify vulnerabilities before they can be exploited maliciously. With a deep understanding of security frameworks and tools, you have successfully fortified numerous enterprise networks against potential threats. Your analytical skills and strategic approach have earned you recognition in the cybersecurity community, and you continue to stay ahead of the curve by mastering emerging technologies and methodologies.",
        llm=llm,
        verbose=True,
        allow_delegation=True,
        tools=[rustscan.rustscan_docs, rustscan.rustscan],
    )
    reporting_analyst = Agent(
        role="Network security reporting analyst",
        goal="create markdown based report on the collected information and findings",
        backstory="You're a meticulous analyst with a keen eye for detail. You're known for your ability to turn complex data into clear and concise reports, making it easy for others to understand and act on the information you provide.",
        llm=llm,
        verbose=True,
        allow_delegation=True,
    )

    reporting_task = Task(
        description="Review the context you got and make it good enough for a report.",
        expected_output="Formatted as markdown without '```'",
        agent=reporting_analyst,
        output_file="output.md",
    )
    port_scanning_task = Task(
        description='Scan the host "scanme.nmap.org" using RustScan',
        expected_output="The relevant details from the results of the RustScan or an error message.",
        agent=network_penetration_tester,
    )
    crew = Crew(
        tasks=[port_scanning_task, reporting_task],
        agents=[network_penetration_tester, reporting_analyst],
        process=Process.sequential,
        verbose=True,
        memory=True,
        cache=True,
        planning=True,
        planning_llm=llm,
    )
    return crew


def kickoff_crew():
    crew = create_crew()
    return crew.kickoff()
