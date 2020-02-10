import sys
import subprocess
def after_func(n):
    def fail_cp():
        print("Failed subprocess was!")
        sys.exit()
    def succ_cp():
        print("Success subprocess was!")
    if n != 0:
        return fail_cp
    else:
        return succ_cp
try:
    complete = subprocess.run(["ll"])
except Exception as other:
    print('Error was occured!')
    sys.exit()
after_func(complete.returncode)()
# 処理に失敗した場合は以下は実行されない
print('成功おめでとう!')
