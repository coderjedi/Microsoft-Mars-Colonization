"""mars_colonization URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from tictactoe import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',views.home,name='home'),
    path('form/',views.form,name='form'),
    path('info/',views.info,name='info'),
    path('redirect/',views.Redirection,name='red'),
    path('minimax/',views.Ai_3_minimax,name='mnmx'),
    path('logical/',views.Ai_3_lgcl,name='lgcl'),
    path('neural/',views.Ai_3_nn,name='nn_page'),
    path('minimax_m/',views.Ai_3_minimax_med,name='mnmx_m'),
    path('logical_m/',views.Ai_3_lgcl_med,name='lgcl_m'),
    path('neural_m/',views.Ai_3_nn_med,name='nn_page_m'),
    path('minimax_e/',views.Ai_3_minimax_easy,name='mnmx_e'),
    path('logical_e/',views.Ai_3_lgcl_easy,name='lgcl_e'),
    path('neural_e/',views.Ai_3_nn_easy,name='nn_page_e'),
    path('r_e/',views.reverse_easy,name='reverse_e'),
    path('r_m/',views.reverse_medium,name='reverse_m'),
    path('r_u/',views.reverse_unbeatable,name='reverse_u'),
    # path('mnm_4e/',views.Ai_4_minimax_e,name='mnmx_4_e'),
    # path('mnm_4m/',views.Ai_4_minimax_m,name='mnmx_4_m'),
    # path('mnm_4u/',views.Ai_4_minimax_u,name='mnmx_4_u'),
    # path('mcts/',views.get_index,name='mcts'),
    path('hmn4/',views.PvP_4,name='human_4'),
    path('hmn3/',views.PvP_3,name='human_3'),
    path('nn/',views.get_index_nn,name='nn'),
    path('lgcl/',views.get_index_logical,name='logical'),
    path('nn_med/',views.get_index_nn_medium,name='nn_m'),
    path('lgcl_med/',views.get_index_logical_medium,name='logical_m'),
    path('nn_easy/',views.get_index_nn_easy,name='nn_e'),
    path('lgcl_easy/',views.get_index_logical_easy,name='logical_e')
]
