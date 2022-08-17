---
title: "Gradleを使ったSparkのHelloWorld!"
date: "2020-07-12T13:34:31+09:00"
draft: false
categories: ["engineering"]
tags: ["Gradle", "Spark"]
ogp_image: "gradle_spark.png"
description: "ビルドツールであるGradleを使用して、web frameworkであるSparkを起動するまでの流れを記述する。"
---

![gradle_spark.png](/images/gradle_spark.png)

ビルドツールである[Gradle](https://github.com/gradle/gradle)を使用して、web framework である[Spark](https://github.com/perwendel/spark)を起動するまでの流れを記述する。

<!-- TOC -->

- [これは何](#%E3%81%93%E3%82%8C%E3%81%AF%E4%BD%95)
- [対象とする読者](#%E5%AF%BE%E8%B1%A1%E3%81%A8%E3%81%99%E3%82%8B%E8%AA%AD%E8%80%85)
- [TL;DL](#tldl)
- [Gradle について](#gradle-%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)
  - [CLI の使用](#cli-%E3%81%AE%E4%BD%BF%E7%94%A8)
  - [IDE での使用](#ide-%E3%81%A7%E3%81%AE%E4%BD%BF%E7%94%A8)
- [Spark について](#spark-%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)
- [Spark の HelloWorld!](#spark-%E3%81%AE-helloworld)
  - [build.gradle を記述](#buildgradle-%E3%82%92%E8%A8%98%E8%BF%B0)
  - [log4j の設定ファイルを用意する](#log4j-%E3%81%AE%E8%A8%AD%E5%AE%9A%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%92%E7%94%A8%E6%84%8F%E3%81%99%E3%82%8B)
  - [Kotlin で Spark の動作確認](#kotlin-%E3%81%A7-spark-%E3%81%AE%E5%8B%95%E4%BD%9C%E7%A2%BA%E8%AA%8D)
- [終わりに](#%E7%B5%82%E3%82%8F%E3%82%8A%E3%81%AB)

<!-- /TOC -->

## これは何

Gradle で Spark を動かすのに苦労したため、同じ過ちを避けるための備忘録。

## 対象とする読者

Gradle も Spark も全く知らない方。

## TL;DL

適切に`build.gradle`を記述し Kotlin から呼び出す。この時一緒に SL4J も読み込んでおくことがポイント。

## Gradle について

[Gradle](https://github.com/gradle/gradle)は複数の言語をサポートするビルドツールだ。

> Gradle is a build tool with a focus on build automation and support for multi-language development.
> (https://github.com/gradle/gradle　より)

対応言語 / プラットフォームは Java, Scala, Android,C/C++, Groovy が挙げられる。これらを使用したプロジェクトの開発サイクルにおいて、その全般（コンパイル/パッケージングからテスト、公開まで）を柔軟にサポートするツールだ。

### CLI の使用

Gradle の使用は、CLI ツールもしくは IDE プラグイン経由で使用することができる。

CLI ツールのインストールは、Mac であれば Homebrew を通して行える。

```
# インストール
brew install gradle

# インストール成否の確認
gradle -v
```

※ Gradle はあらゆる OS に対応しているが、インストール時に[JavaJDK もしくは JRE(version 8)](https://www.oracle.com/java/technologies/javase-downloads.html)が必要となるため事前にインストールしておく必要がある。

### IDE での使用

Gradle は多くの IDE によりサポートされており、CLI ツールをインストールせずとも、各 IDE から提供されている Gradle 拡張をインストールすることで、IDE 経由で使用することができる。

インストール手順は各 IDE のマニュアルを参照。IntelliJは[こちら](https://www.jetbrains.com/help/idea/gradle.html)

## Spark について

Spark は Kotlin / Java で Web アプリを作るためのマイクロフレームワークだ。「生産性の向上(Built for productivy)」のためのフレームワークとして、開発者が少ないコードで多くの機能を実現できるようにするという、極めてシンプルな哲学を掲げている。

> With a clear philosophy Spark is designed not only to make you more productive, but also to make your code better under the influence of Spark’s sleek, declarative and expressive syntax.
> (http://sparkjava.com/　より)

多くの場合、REST API の作成に使用されることの多い Spark だが、複数のテンプレートエンジンをサポートしているため、バックエンドからフロントエンドまでカバーすることができる。

## Spark の HelloWorld!

ここでは Spark を Gradle 経由で起動する際に、用意するべき最低限のファイルについて記す。

### build.gradle を記述

以下のビルドファイルを用意する。

```
plugins {
    id 'org.jetbrains.kotlin.jvm' version '1.3.72'
}

repositories {
    mavenCentral()
}

dependencies {
    implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk8"
    implementation "com.sparkjava:spark-kotlin:1.0.0-alpha"
    implementation 'org.slf4j:slf4j-log4j12:1.7.21'
}
```

ポイントとして、上から順に、

- IntelliJ で Kotlin をサポートするよう、プラグインを読む
- [Mave Central repository](https://docs.gradle.org/current/userguide/declaring_repositories.html#sub:maven_central)をライブラリとして追加
- spark を読み込む([公式ドキュメント](http://sparkjava.com/documentation#getting-started)を参照)
- SLF4J(Simple Logging Facade for Java)を読み込む
  - Spark 内部で動作している(?)ため要読込（<= 詳細 要確認）

SLF4J を読み込まないと Gradle に怒られる。この点については Spark の公式 Document に言及がなかったため困惑した。

### log4j の設定ファイルを用意する

SLF4J を使用する上で、設定ファイルが必要となる。設定ファイルを`src/main/resources/lob4j.properties`として作成し、以下の設定を記述する。

```
log4j.rootLogger=DEBUG, console
log4j.logger.xxx=DEBUG, console

log4j.appender.console=org.apache.log4j.ConsoleAppender
log4j.appender.console.layout=org.apache.log4j.PatternLayout
log4j.appender.console.layout.ConversionPattern=%d [%-5p-%c] %m%n
```

### Kotlin で Spark の動作確認

Get リクエストに対する応答を書き、正しくコードが実行されるようであれば成功。

```kotlin
import spark.Spark.get

fun main(args: Array<String>) {
    get("/hello"){req, res -> "Hello Spark!"}
}
```

## 終わりに

Gradle を使用した Spark の動作を確認してきた。
各設定について、特に Gradle については不明な点が多すぎるため、今後も調べていきたい。

**要確認**

- Gradle と Maven との比較
- `build.gradle`の`compile`と`implementation`の違い
- `build scan`の使いどころ
- buildscript
