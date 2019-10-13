public class MyNumber implements Printable {
    private int a;

    private MyNumber(int a) {
        this.a = a;
    }

    @Override
    public void debugPrint() {
        System.out.println("インスタンスの値は " + this.a + " です。");
    }

    public static void main(String[] args) {
        MyNumber m = new MyNumber(100);
        m.debugPrint();
    }
}
