public class ArrayPractice {
    public static void main(String[] args) {
        int[] ten = {70, 80, 90, 100, 110};

        int[] ids;

        ids = new int[2];
        ids[0] = 1;
        ids[1] = 2;

        System.out.println(ids.length);
        System.out.println(ten.length);

        ten = new int[]{90, 100, 80};

        System.out.println(ten.length);
    }


}
