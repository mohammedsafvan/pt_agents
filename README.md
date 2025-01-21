# Pt-agents

## Setup

### Add .env

add `.env` in root directory using these keys
`GEMINI_API_KEY=`

### Install dependecies

#### Backend

- Open terminal and type `cd backend`
- Create virtual environement by typing `python3 -m venv .venv`
- activate virtual environement (Linux or Windows)
- In **Linux** type `source .venv/bin/activate`
- In **Windows** type `./.venv/bin/activate` (I guess)
- After activating, install packages using `pip install -r requirements.txt`

> ! Ensure that you have `nmap` installed and configured for PATH variables

#### Frontend (Currently No frontend, So skip this)

- `cd frontend` from root folder
- Type `npm i`

### Run

Running the application

#### Backend

> Make sure that the virtual environement is activated

- from `backend` directory type `fastapi dev main.py`

> This will start the backend fastapi server
> You can check the api documentation using `http://localhost:8000/docs`

#### Frontend (No Frontend available)

from `frontend` directory type `npm run dev`

> This will start the developement frontend

## TODO

- [ ] Need to validate the addres or host using `@before_kickoff`
- [ ] Adding basic frontend layout
- [ ] Adding Markdown rendering at the frontend(Not Streaming for the time being)
- [ ] Log streaming to the frontend
- [ ] Add searching through expoitDB for vulnerable version and fetch them

# Please do not use for unethical purpose
This tool is designed strictly for ethical and legal purposes.
Please use it in only that way!
