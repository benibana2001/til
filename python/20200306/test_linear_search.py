import pytest

def linearSearch(ary, target):
    result = -1
    for i in range(len(ary)):
        if ary[i] == target:
            result = i
            break
    return result
def test_linear_search():
    assert linearSearch([1, 2, 3], 3) == 2

# %%
def binary_search(ary, target):
    left = 0
    right = len(ary)
    find = -1
    while left < right:
        middle = ary[int((left + right) / 2)]
        if middle == target:
            find = middle
            break
        elif ary[middle] < target:
            left = middle + 1
        else:
            right = middle - 1
    return find

print(binary_search([1, 2, 3], 3))


def test_binary_search():
    assert binary_search([1, 2, 3], 3) == 2