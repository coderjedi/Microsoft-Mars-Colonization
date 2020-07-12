from django.shortcuts import render,redirect
from django.http import HttpResponseRedirect
import numpy as np
from pprint import pprint
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
import os
import tensorflow as tf
from keras.models import load_model,model_from_json
import random
import numpy as np
import math


# Redirects the user to a specific url based on game settings selected by them
@csrf_exempt
def Redirection(request):
    if request.POST['mode']=="yes":
        print("entering AI")
        level=request.POST['level']
        if request.POST['algo']=="Logic":
            if(level=="easy"):
                return redirect('lgcl_e', permanent=True)
            elif(level=="medium"):
                return redirect('lgcl_m', permanent=True)
            else:
                return redirect('lgcl', permanent=True)
        elif request.POST['algo']=="NN":
            if(level=="easy"):
                return redirect('nn_page_e', permanent=True)
            elif(level=="medium"):
                return redirect('nn_page_m', permanent=True)
            else:
                return redirect('nn_page', permanent=True)
        elif request.POST['algo']=="Reverse":
            if(level=="easy"):
                return redirect('reverse_e', permanent=True)
            elif(level=="medium"):
                return redirect('reverse_m', permanent=True)
            else:
                return redirect('reverse_u', permanent=True)
        else:
            # if(request.POST['grid']=="4"):
            #     if(level=="easy"):
            #         return redirect('mnmx_4_e', permanent=True)
            #     elif(level=="medium"):
            #         return redirect('mnmx_4_m', permanent=True)
            #     else:
            #         return redirect('mnmx_4_u', permanent=True)
            # else:
            if(level=="easy"):
                return redirect('mnmx_e', permanent=True)
            elif(level=="medium"):
                return redirect('mnmx_m', permanent=True)
            else:
                return redirect('mnmx', permanent=True)
    else:
        if(request.POST['grid']=="4"):
            return redirect('human_4', permanent=True)
        else:
            return redirect('human_3', permanent=True)

# ***************************** List of view for rendering different pages according to game settings*****************************
def home(request):
    return render(request, 'index.html')

def form(request):
    return render(request, 'form.html')

def info(request):
    return render(request, 'knowmore.html')

def Ai_3_minimax(request):
    return render(request, 'ai_3_unbeatable.html',{"algo": "Minimax"})

def Ai_3_lgcl(request):
    return render(request, 'ai_3_unbeatable.html',{"algo": "Logical"})

def Ai_3_nn(request):
    return render(request, 'ai_3_unbeatable.html',{"algo": "Neural Network Based"})

def Ai_3_minimax_med(request):
    return render(request, 'ai_3_medium.html',{"algo": "Minimax"})

def Ai_3_lgcl_med(request):
    return render(request, 'ai_3_medium.html',{"algo": "Logical"})

def Ai_3_nn_med(request):
    return render(request, 'ai_3_medium.html',{"algo": "Neural Network Based"})

def Ai_3_minimax_easy(request):
    return render(request, 'ai_3_easy.html',{"algo": "Minimax"})

def Ai_3_lgcl_easy(request):
    return render(request, 'ai_3_easy.html',{"algo": "Logical"})

def Ai_3_nn_easy(request):
    return render(request, 'ai_3_easy.html',{"algo": "Neural Network Based"})

def PvP_4(request):
    return render(request, 'human_4.html')

def PvP_3(request):
    return render(request, 'human_3.html')

def reverse_easy(request):
    return render(request, 'ai_reverse_tictactoe.html',{"level": "Easy"})

def reverse_medium(request):
    return render(request, 'ai_reverse_tictactoe.html',{"level": "Medium"})

def reverse_unbeatable(request):
    return render(request, 'ai_reverse_tictactoe.html',{"level": "Unbeatable"})

# def Ai_4_minimax_e(request):
#     return render(request, 'minimax_4.html',{"level": "easy"})
#
# def Ai_4_minimax_m(request):
#     return render(request, 'minimax_4.html',{"level": "medium"})
#
# def Ai_4_minimax_u(request):
#     return render(request, 'minimax_4.html',{"level": "unbeatable"})

# ****************************************************************************************************************************************************
# @csrf_exempt
# def get_index(request):
#     print("-----------Board is:")
#     print(request.POST['brd'])
#     state=np.asarray(json.loads(request.POST['brd']))
#     initial_board_state = TicTacToeGameState(state = state, next_to_move=1)
#     root = TwoPlayersGameMonteCarloTreeSearchNode(state = initial_board_state)
#     mcts = MonteCarloTreeSearch(root)
#     best_node = mcts.best_action(5000)
#     index_array=best_node.state.board-state
#     first=np.nonzero(index_array)[0][0]
#     second=np.nonzero(index_array)[1][0]
#     print("First is:"+str(first)+"Second is:"+str(second))
#     responsedata={
#         'x':int(first),
#         'y':int(second)
#     }
#     return JsonResponse(responsedata)

# Check if any of the players has won,
# b: tictactoe board
# m:player value
def checkWin(b, m):
    return ((b[0] == m and b[1] == m and b[2] == m) or  # H top
            (b[3] == m and b[4] == m and b[5] == m) or  # H mid
            (b[6] == m and b[7] == m and b[8] == m) or  # H bot
            (b[0] == m and b[3] == m and b[6] == m) or  # V left
            (b[1] == m and b[4] == m and b[7] == m) or  # V centre
            (b[2] == m and b[5] == m and b[8] == m) or  # V right
            (b[0] == m and b[4] == m and b[8] == m) or  # LR diag
            (b[2] == m and b[4] == m and b[6] == m))  # RL diag

# Make a duplicate of the board when testing moves as we don't want to change the actual board
def getBoardCopy(b):
    dupeBoard = []
    for j in b:
        dupeBoard.append(j)
    return dupeBoard

# Finds if any move can cause victory
# b = the board
# mark = 0 or X
# i = the square to check if makes a win
def testWinMove(b, mark, i):
    bCopy = getBoardCopy(b)
    bCopy[i] = mark
    return checkWin(bCopy, mark)

# Determines if a move opens up a fork
def forkMove(b, mark, i):
    bCopy = getBoardCopy(b)
    bCopy[i] = mark
    winningMoves = 0
    for j in range(0, 9):
        if testWinMove(bCopy, mark, j) and bCopy[j] == 0:#0
            winningMoves += 1
    return winningMoves >= 2


def check_corner_case(b):
    count=0
    for i in range(0, 9):
        if b[i] == 1:
            count=count+1
    if count==1 and b[4]==0:
        return 4
    elif count==2 and b[6]==1 and b[2]==1:
        return 5
    else:
        return -1

# Function to implement unbeatable AI based on logical algorithm
@csrf_exempt
def get_index_logical(request):
        # Check computer win moves
    b=np.asarray(json.loads(request.POST['brd'])).flatten()
    print('-----------------board is:',b)
    for i in range(0, 9):
        if b[i] == 0 and testWinMove(b, -1, i):
            responsedata={
                'x':int(i/3),
                'y':int(i%3)
            }
            return JsonResponse(responsedata)
    # Check player win moves
    for i in range(0, 9):
        if b[i] == 0 and testWinMove(b, 1, i):
            responsedata={
                            'x':int(i/3),
                            'y':int(i%3)
            }
            return JsonResponse(responsedata)
    # Check computer fork opportunities
    for i in range(0, 9):
        if b[i] == 0 and forkMove(b, -1, i):
            responsedata={
                            'x':int(i/3),
                            'y':int(i%3)
            }
            return JsonResponse(responsedata)
    # Check player fork opportunities, incl. two forks
    playerForks = 0
    for i in range(0, 9):
        if b[i] == 0 and forkMove(b, 1, i):
            playerForks += 1
            tempMove = i
    if playerForks == 1:
        responsedata={
                        'x':int(tempMove/3),
                        'y':int(tempMove%3)
        }
        return JsonResponse(responsedata)
    elif playerForks == 2:
        for j in [1, 3, 5, 7]:
            if b[j] == 0:
                responsedata={
                                'x':int(j/3),
                                'y':int(j%3)
                }
                return JsonResponse(responsedata)
    # Play center
    if b[4] == 0:
        responsedata={
                        'x':1,
                        'y':1
        }
        return JsonResponse(responsedata)
    # Play a corner
    for i in [0, 2, 6, 8]:
        if b[i] == 0:
            responsedata={
                            'x':int(i/3),
                            'y':int(i%3)
            }
            return JsonResponse(responsedata)
    #Play a side
    for i in [1, 3, 5, 7]:
        if b[i] == 0:
            responsedata={
                            'x':int(i/3),
                            'y':int(i%3)
            }
            return JsonResponse(responsedata)


export_path = os.path.join(os.getcwd(),'tictactoe','tic_tac_toe_2.h5')
model =load_model(export_path)
model._make_predict_function()

# Computes one hot vector representation of the board state.This one hot encoded vector is passed as input to the NN model
def one_hot(state):
    current_state = []

    for square in state:
        if square == 0:
            current_state.append(1)
            current_state.append(0)
            current_state.append(0)
        elif square == 1:
            current_state.append(0)
            current_state.append(1)
            current_state.append(0)
        elif square == -1:
            current_state.append(0)
            current_state.append(0)
            current_state.append(1)

    print("current state is:",current_state)

    return current_state

# ***************************** The details of the Neural network model defined by us (for creating NN based AI) can be found in model.py inside ml_models folder*****************************************
# Loads the unbeatable neural network model to mimic medium level and makes predictions using it
@csrf_exempt
def get_index_nn(request):
    board=np.asarray(json.loads(request.POST['brd'])).flatten()
    b=list(board)
    result = model.predict(np.asarray([one_hot(b)]), batch_size=1)[0]
    print(result)
    highest = -1000
    i = -1
    for j in range(0, 9):
        if b[j] == 0:
            if result[j] > highest:
                highest = result[j].copy()
                i = j
    print("The next move shuld be:",i);
    corner_case=check_corner_case(board)
    print("corner case is",corner_case)
    if(corner_case!=-1):
        print("Its corner case:",corner_case)
        i=corner_case
    responsedata={
                    'x':int(i/3),
                    'y':int(i%3)
    }
    return JsonResponse(responsedata)

# Function to implement medium level AI based on logical algorithm
@csrf_exempt
def get_index_logical_medium(request):
    # Check computer win moves
    b=np.asarray(json.loads(request.POST['brd'])).flatten()
    # Check computer win moves
    for i in range(0, 9):
        if b[i] == 0 and testWinMove(b, -1, i):
            responsedata={
                'x':int(i/3),
                'y':int(i%3)
            }
            return JsonResponse(responsedata)
    # Check player win moves
    for i in range(0, 9):
        if b[i] == 0 and testWinMove(b, 1, i):
            responsedata={
                            'x':int(i/3),
                            'y':int(i%3)
            }
            return JsonResponse(responsedata)
    # Check computer fork opportunities
    for i in range(0, 9):
        if b[i] == 0 and forkMove(b, -1, i):
            responsedata={
                            'x':int(i/3),
                            'y':int(i%3)
            }
            return JsonResponse(responsedata)
    # Play a corner
    for i in [0, 2, 6, 8]:
        if b[i] == 0:
            responsedata={
                            'x':int(i/3),
                            'y':int(i%3)
            }
            return JsonResponse(responsedata)
    # Play center
    if b[4] == 0:
        responsedata={
                        'x':1,
                        'y':1
        }
        return JsonResponse(responsedata)
    #Play a side
    for i in [1, 3, 5, 7]:
        if b[i] == 0:
            responsedata={
                            'x':int(i/3),
                            'y':int(i%3)
            }
            return JsonResponse(responsedata)


def check_corner_case_medium(b):
    count=0
    for i in range(0, 9):
        if b[i] == 1:
            count=count+1
    if count==1 and b[4]==0:
        return 4
    else:
        return -1

# Loads the lesser accurate model to mimic medium level and makes predictions using it
@csrf_exempt
def get_index_nn_medium(request):
    board=np.asarray(json.loads(request.POST['brd'])).flatten()
    b=list(board)
    result = model.predict(np.asarray([one_hot(b)]), batch_size=1)[0]
    print(result)
    highest = -1000
    i = -1
    for j in range(0, 9):
        if b[j] == 0:
            if result[j] > highest:
                highest = result[j].copy()
                i = j
    print("The next move shuld be:",i);
    corner_case=check_corner_case_medium(board)
    print("corner case is",corner_case)
    if(corner_case!=-1):
        print("Its corner case:",corner_case)
        i=corner_case
    responsedata={
                    'x':int(i/3),
                    'y':int(i%3)
    }
    return JsonResponse(responsedata)

# Function to implement easy level AI based on logical algorithm
@csrf_exempt
def get_index_logical_easy(request):
    # Check computer win moves
    b=np.asarray(json.loads(request.POST['brd'])).flatten()
    # Check computer win moves
    for i in range(0, 9):
        if b[i] == 0 and testWinMove(b, -1, i):
            responsedata={
                'x':int(i/3),
                'y':int(i%3)
            }
            return JsonResponse(responsedata)
    # Check player win moves
    for i in range(0, 9):
        if b[i] == 0 and testWinMove(b, 1, i):
            responsedata={
                            'x':int(i/3),
                            'y':int(i%3)
            }
            return JsonResponse(responsedata)
    # Play a corner
    for i in [0, 2, 6, 8]:
        if b[i] == 0:
            responsedata={
                            'x':int(i/3),
                            'y':int(i%3)
            }
            return JsonResponse(responsedata)
    # Play center
    if b[4] == 0:
        responsedata={
                        'x':1,
                        'y':1
        }
        return JsonResponse(responsedata)
    #Play a side
    for i in [1, 3, 5, 7]:
        if b[i] == 0:
            responsedata={
                            'x':int(i/3),
                            'y':int(i%3)
            }
            return JsonResponse(responsedata)


# Loads the lesser accurate model to mimic easy level and makes predictions using it
@csrf_exempt
def get_index_nn_easy(request):
    board=np.asarray(json.loads(request.POST['brd'])).flatten()
    b=list(board)
    result = model.predict(np.asarray([one_hot(b)]), batch_size=1)[0]
    print(result)
    highest = -1000
    i = -1
    for j in range(0, 9):
        if b[j] == 0:
            if result[j] > highest:
                highest = result[j].copy()
                i = j
    print("The next move shuld be:",i);
    responsedata={
                    'x':int(i/3),
                    'y':int(i%3)
    }
    return JsonResponse(responsedata)
