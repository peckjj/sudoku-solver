import numpy as np

def test():
    puzzle = create_puzzle()

    print_puzzle(puzzle)
    print(isValid(puzzle))


def main():
    puzzle = create_puzzle()

    # solved_puzzle = solve(puzzle)
    print_puzzle(puzzle)

def create_puzzle():
    return np.array([
        [1, 2, 3,  4, 5, 6,  7, 8, 9],
        [4, 5, 6,  7, 8, 9,  1, 2, 3],
        [7, 8, 9,  1, 2, 3,  4, 5, 6],

        [2, 3, 1,  5, 6, 4,  8, 9, 7],
        [5, 6, 4,  8, 9, 7,  2, 3, 1],
        [8, 9, 7,  2, 3, 1,  5, 6, 4],

        [3, 1, 2,  6, 4, 5,  9, 7, 8],
        [6, 4, 5,  9, 7, 8,  3, 1, 2],
        [9, 7, 8,  3, 1, 2,  6, 4, 5],
    ])

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

def solve(puzzle, x=0, y=0):
    solved_puzzle = list(puzzle)

    for i in range(1, 10):
        solved_puzzle[x][y] = i
        
        if isValid(solved_puzzle):
            x += 1

            if (x == 9):
                x = 0
                y += 1

            if (y == 9):
                return solved_puzzle

            solved_puzzle = solve(solved_puzzle, x, y)

            if isSolved(solved_puzzle):
                return solved_puzzle

    return solved_puzzle    

def isValid(puzzle):
    grid = subgridify(puzzle)
    for i in range(9):
        if not allUnique(puzzle[:, i]):
            return False
        if not allUnique(puzzle[i, :]):
            return False
    for row in grid:
        if not allUnique(row):
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

test()