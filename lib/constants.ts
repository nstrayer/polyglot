export const starterScript = `library(dotenv) # Will read OPENAI_API_KEY from .env file
# elmer is a package for creating and managing chatbots
library(elmer)

chat <- chat_openai(
  model = "gpt-4o-mini",
  system_prompt = "You are a terse assistant.",
)
chat$chat("What is the capital of the moon?")

# The \`chat\` object is stateful, so this continues the existing conversation
chat$chat("Are you sure about that?")
`

export const samplePipList = `Package                  Version
------------------------ -----------
aiohappyeyeballs         2.4.3
aiohttp                  3.10.10
aiosignal                1.3.1
annotated-types          0.7.0
anyio                    4.6.2.post1
appnope                  0.1.4
asttokens                2.4.1
attrs                    24.2.0
certifi                  2024.8.30
charset-normalizer       3.4.0
comm                     0.2.2
debugpy                  1.8.7
decorator                5.1.1
distro                   1.9.0
executing                2.1.0
frozenlist               1.5.0
h11                      0.14.0
httpcore                 1.0.6
httpx                    0.27.2
idna                     3.10
ipykernel                6.29.5
ipython                  8.29.0
jedi                     0.19.1
jiter                    0.6.1
jsonpatch                1.33
jsonpointer              3.0.0
jupyter_client           8.6.3
jupyter_core             5.7.2
langchain                0.3.4
langchain-core           0.3.13
langchain-openai         0.2.4
langchain-text-splitters 0.3.0
langsmith                0.1.137
matplotlib-inline        0.1.7
multidict                6.1.0
nest-asyncio             1.6.0
numpy                    1.26.4
openai                   1.52.2
orjson                   3.10.10
packaging                24.1
parso                    0.8.4
pexpect                  4.9.0
pip                      24.0
platformdirs             4.3.6
prompt_toolkit           3.0.48
propcache                0.2.0
psutil                   6.1.0
ptyprocess               0.7.0
pure_eval                0.2.3
pydantic                 2.9.2
pydantic_core            2.23.4
Pygments                 2.18.0
python-dateutil          2.9.0.post0
python-dotenv            1.0.1
PyYAML                   6.0.2
pyzmq                    26.2.0
regex                    2024.9.11
requests                 2.32.3
requests-toolbelt        1.0.0
six                      1.16.0
sniffio                  1.3.1
SQLAlchemy               2.0.36
stack-data               0.6.3
tenacity                 9.0.0
tiktoken                 0.8.0
tornado                  6.4.1
tqdm                     4.66.6
traitlets                5.14.3
typing_extensions        4.12.2
urllib3                  2.2.3
wcwidth                  0.2.13
yarl                     1.17.0`