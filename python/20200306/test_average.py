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
    assert aver(ary) == 4


# %%
def highOrder(num_a):
    def inner(num_b):
        return num_b * num_a
    return inner

# %%
def test_high_order():
    assert highOrder(10)(20) == 200