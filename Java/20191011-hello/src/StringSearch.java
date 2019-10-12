import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class StringSearch {
    public static void main(String[] args) {
        // コマンド実行時引数を取得
        // 引数が一つ以外の時 以上系
        if (args.length != 1) {
            System.out.println("使用法が異なります。");
            System.exit(0);
        }

        // 引数が一つの時　正常系
        String findString = args[0];
        System.out.println("検索文字列は " + findString + " です。");

        // readerインスタンス作成
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));

        //
        try {
            String line;
            int linenum = 1;
            while ((line = reader.readLine()) != null) {
                int n = line.indexOf(findString);
                if (n >= 0) {
                    System.out.println(linenum + ": " + line);
                }
                linenum++;
            }

        } catch (IOException e) {
            System.out.println(e);
        }

        //
    }
}
