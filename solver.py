import numpy as np

def test():
    puzzle = create_puzzle()
    original_puzzle = list(puzzle)
    print_puzzle(puzzle)
    print(isValid(puzzle))


def main():
    global puzzle
    puzzle = create_puzzle()
    original_puzzle = list(puzzle)
    solve()

def create_puzzle():
    # return [
    #     [0, 0, 1,  0, 0, 0,  7, 4, 0],
    #     [2, 0, 0,  0, 1, 0,  0, 0, 9],
    #     [0, 0, 4,  0, 9, 3,  0, 0, 0],

    #     [8, 0, 3,  0, 0, 7,  0, 0, 0],
    #     [0, 1, 0,  0, 0, 0,  0, 9, 0],
    #     [0, 0, 0,  3, 0, 0,  5, 0, 6],

    #     [0, 0, 0,  6, 5, 0,  9, 0, 0],
    #     [3, 0, 0,  0, 7, 0,  0, 0, 5],
    #     [0, 7, 8,  0, 0, 0,  4, 0, 0],
    # ]

    return np.zeros((9, 9))

def print_puzzle(puzzle):
    current_row = 1
    
    for row in puzzle:
        current_column = 1
        
        for elem in row:
            print(elem, end=" ")
            if (current_column % 3 == 0):
                print(" ", end=" ")
            current_column += 1
        
        print()        
        if (current_row % 3 == 0):
            print()
        current_row += 1

def solve():
    global puzzle
    for x in range(9):
        for y in range(9):
            if puzzle[x][y] == 0:
                for i in range(1, 10):
                    if isPossible(x, y, i):
                        puzzle[x][y] = i
                        solve()
                puzzle[x][y] = 0
                return
    print_puzzle(puzzle)
    input("More?")  

def isPossible(x, y, n):
    global puzzle
    for i in range(9):
        if puzzle[x][i] == n:
             return False
        if puzzle[i][y] == n:
             return False

    x0 = (x // 3) * 3
    y0 = (y // 3) * 3
    for i in range(3):
        for j in range(3):
            if puzzle[i + x0][j + y0] == n:
                 return False

    return True

def allUnique(l):
    return len(l) == len(set(l))

def subgridify(puzzle):
    grids = [
        [],
        [],
        [],

        [],
        [],
        [],

        [],
        [],
        [],
    ]
    for x in range(9):
        for i in range(9):
            grids[ (i // 3) + (3 * (x // 3)) ].append(puzzle[x][i])
    return grids

main()