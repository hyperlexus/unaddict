from fastapi import FastAPI
app = FastAPI()


@app.get("/")
async def root():
    return {"greeting": "hi"}


@app.post("/")
async def post():
    return {"message": "allahu akbar"}


@app.get("/u")
async def tester():
    return {"a"}


@app.get("/u/me")
async def ygm():
    return {"message": "viewing profile"}


@app.get("/u/{uid}")
async def testallah(uid: int):
    return {"uid": uid}
