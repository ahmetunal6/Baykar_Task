# Generated by Django 3.2.9 on 2023-05-31 19:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ihaPage', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sihaiha',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='categorys', to='ihaPage.category'),
        ),
        migrations.AlterField(
            model_name='sihaiha',
            name='country',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='countrys', to='ihaPage.country'),
        ),
    ]