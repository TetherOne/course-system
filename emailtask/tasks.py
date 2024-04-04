from celery.utils.log import get_task_logger
from celery import shared_task
from emailtask.email import send_review_email

logger = get_task_logger(__name__)


@shared_task(name="send_review_email_task")
def send_review_email_task(email):
    logger.info("Sent review email")
    return send_review_email(email)
