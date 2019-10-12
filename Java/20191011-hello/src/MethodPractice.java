import java.util.StringJoiner;

public class MethodPractice {
    public static void main(String[] args) {
        int p, q;
        p = 10000;
        q = halve(p);

        System.out.println(q);
    }

    private static int halve(int n) {
        return n / 2;
    }
}
