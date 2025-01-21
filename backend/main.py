from fastapi import FastAPI

from crews.crew_manager import kickoff_crew

app = FastAPI(title="PT-agents")


@app.get("/")
async def ping():
    return {"Hello": "World"}


@app.post("/kickoff")
async def kickoff():
    result = kickoff_crew()
    return {"result": result.tasks_output[-1]}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app)
