FROM python:3.10

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONFAULTHANDLER=1 \
    PYTHONHASHSEED=random \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    PATH="$PATH:/root/.local/bin"

RUN apt-get update && apt-get install -y netcat
RUN curl -sSL https://install.python-poetry.org | python -

WORKDIR /usr/src/app

COPY poetry.lock .
COPY pyproject.toml .

RUN poetry config virtualenvs.create false
RUN poetry install --no-interaction --no-ansi

COPY . .

# RUN adduser --disabled-password --gecos '' default
RUN chmod +x ./boot.sh

ENTRYPOINT ["./boot.sh"]