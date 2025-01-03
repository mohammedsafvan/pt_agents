#!/usr/bin/env python
import warnings

from pt_agents.crew import PtAgents

warnings.filterwarnings("ignore", category=SyntaxWarning, module="pysbd")


def run():
    """
    Run the crew.
    """
    inputs = {"topic": "AI LLMs"}
    PtAgents().crew().kickoff(inputs=inputs)
