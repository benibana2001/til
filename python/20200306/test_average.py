import pytest

# In order to enable test on VSCode,
# check here:
#   https://code.visualstudio.com/docs/python/testing

ary = [1, 3, 10, 2, 8]
# %%
def aver(ary):
    sum = 0
    for i in range(len(ary)):
        sum += ary[i]
    return sum / len(ary)

def test_aver():
    assert aver(ary) == 4.8
