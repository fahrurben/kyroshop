# Generated by Django 5.2 on 2025-04-14 22:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kyroshop', '0006_alter_product_name_alter_product_slug_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='description',
            field=models.TextField(default=''),
        ),
    ]
