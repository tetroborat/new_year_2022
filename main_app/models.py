from django.db import models


class Congratulation(models.Model):
    class Meta:
        verbose_name = 'Поздравление'
        verbose_name_plural = 'Поздравления'

    for_who = models.CharField(
        verbose_name='Для кого',
        max_length=50
    )
    text_on_card = models.TextField(
        verbose_name='Текст на главной странице'
    )
    slug = models.SlugField(
        verbose_name='Семантический идентификатор',
        unique=True
    )
    title = models.CharField(
        verbose_name='Заголовок',
        max_length=100
    )

    def __str__(self):
        return self.for_who
