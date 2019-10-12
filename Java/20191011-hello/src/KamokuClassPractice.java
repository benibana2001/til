public class KamokuClassPractice {
    String name;
    int tensuu;

    public KamokuClassPractice(String name, int tensuu) {
        this.name = name;
        this.tensuu = tensuu;
    }

    @Override
    public String toString() {
        return name + " は " + tensuu + " 点";
    }
}
