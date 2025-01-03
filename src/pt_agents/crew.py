from crewai import LLM, Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task

from pt_agents.tools import rustscan

llm = LLM(model="gemini/gemini-1.5-flash")


@CrewBase
class PtAgents:
    """PtAgents crew"""

    agents_config = "config/agents.yaml"
    tasks_config = "config/tasks.yaml"

    @agent
    def network_penetration_tester(self) -> Agent:
        return Agent(
            llm=llm,
            verbose=True,
            allow_delegation=True,
            tools=[
                rustscan.rustscan_docs,
                rustscan.rustscan,
            ],
            config=self.agents_config[  # type:ignore
                "network_penetration_tester"
            ],
        )

    @agent
    def reporting_analyst(self) -> Agent:
        return Agent(
            llm=llm,
            verbose=True,
            config=self.agents_config["reporting_analyst"],  # type: ignore
            allow_delegation=True,
        )

    @task
    def port_scanning_task(self) -> Task:
        return Task(config=self.tasks_config["port_scanning_task"])  # type: ignore

    @task
    def reporting_task(self) -> Task:
        return Task(
            config=self.tasks_config["reporting_task"],  # type: ignore
            output_file="report.md",
        )

    @crew
    def crew(self) -> Crew:
        """Creates the PtAgents crew"""
        return Crew(
            agents=self.agents,  # type: ignore
            tasks=self.tasks,  # type: ignore
            process=Process.sequential,
            verbose=True,
            # memory=True,
            # cache=True,
            planning=True,
            planning_llm=llm,
        )
