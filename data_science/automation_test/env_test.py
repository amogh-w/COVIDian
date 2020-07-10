from dotenv import load_dotenv
import os

load_dotenv()
print(os.getenv("covidian_server_internal_mongo_url"))
