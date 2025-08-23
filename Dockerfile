FROM ruby:3.4.5-slim

# 環境変数
ENV LANG=C.UTF-8 \
    TZ=Asia/Tokyo \
    BUNDLER_VERSION=2.5.9

# 必要パッケージのインストール
RUN apt-get update -qq && apt-get install -y \
  build-essential \
  libyaml-dev \
  libssl-dev \
  libreadline-dev \
  zlib1g-dev \
  git \
  && rm -rf /var/lib/apt/lists/*

# bundler インストール
RUN gem install bundler -v ${BUNDLER_VERSION}

# 作業ディレクトリ
WORKDIR /app

# Gemfile をコピーして bundle install
COPY Gemfile Gemfile.lock ./
RUN bundle install

# アプリのコードをコピー（compose の volume マウントで上書きされる想定）
COPY . .

# ポート公開
EXPOSE 3000

# Rails 起動コマンド
CMD ["bin/rails", "server", "-b", "0.0.0.0", "-p", "3000"]
