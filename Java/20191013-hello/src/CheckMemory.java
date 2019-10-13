public class CheckMemory {
    public static void main(String[] args) {
        int counter = 0;
        while (true) {
            /*
            if (counter % 100 == 0){
                System.gc();
                System.out.println("=CLEAR=================");
            }
            */
            String s = new String("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
            System.out.println("残りメモリ = " + Runtime.getRuntime().freeMemory());

            counter++;
        }
    }
}
