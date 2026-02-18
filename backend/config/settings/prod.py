import os

from .base import *  # noqa: F403


DEBUG = False

SECRET_KEY = os.environ["DJANGO_SECRET_KEY"]
ALLOWED_HOSTS = [
    h.strip()
    for h in os.environ.get("DJANGO_ALLOWED_HOSTS", "example.com").split(",")
    if h.strip()
]


DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": os.environ.get("MYSQL_DATABASE", "intia"),
        "USER": os.environ.get("MYSQL_USER", "intia"),
        "PASSWORD": os.environ.get("MYSQL_PASSWORD", ""),
        "HOST": os.environ.get("MYSQL_HOST", "localhost"),
        "PORT": os.environ.get("MYSQL_PORT", "3306"),
        "OPTIONS": {
            "charset": "utf8mb4",
        },
    }
}


if os.environ.get("DJANGO_CSRF_TRUSTED_ORIGINS"):
    CSRF_TRUSTED_ORIGINS = [
        origin.strip()
        for origin in os.environ["DJANGO_CSRF_TRUSTED_ORIGINS"].split(",")
        if origin.strip()
    ]


LOG_LEVEL = os.environ.get("DJANGO_LOG_LEVEL", "INFO")
LOGGING = build_logging(LOG_LEVEL)  # noqa: F405

