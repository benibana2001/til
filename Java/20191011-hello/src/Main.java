public class Main {
    public static void main(StringReplace[] args) {
        int i = 4;
        double d = 10.2;

        System.out.println("iは" + i);
        System.out.println("dは" + d);

        // ⬇️これが通る...
        System.out.println("x * dは" + (i * d));

        char c = 'A';

        System.out.println("cは" + c);
    }
}
