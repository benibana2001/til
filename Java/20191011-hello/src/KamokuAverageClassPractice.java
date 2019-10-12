public class KamokuAverageClassPractice {
    public static void main(String[] args) {
        KamokuClassPractice[] kamoku = {
                new KamokuClassPractice("国語", 60),
                new KamokuClassPractice("数学", 70),
                new KamokuClassPractice("英語", 30),
                new KamokuClassPractice("理科", 90),
                new KamokuClassPractice("社会", 100)
        };

        // 全科目の合計値
        int sum = 0;
        for (int i = 0; i < kamoku.length; i++) {
            System.out.println(kamoku[i]);
            // 全科目の点数を足し合わせる
            sum += kamoku[i].tensuu;
        }

        double heikin = (double)sum / kamoku.length;
        System.out.println("平均点は " + heikin + " 点");



    }
}
