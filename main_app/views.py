from django.views.generic import DetailView

from main_app.models import Congratulation


class CongratulationView(DetailView):
    template_name = 'main_page.html'
    model = Congratulation
