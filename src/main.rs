use clap::Parser;

#[derive(Parser, Debug)]
#[command(version, about, long_about = None)]
struct Args {
    /// Name of the person to greet
    #[arg(short, long)]
    ymd: String,
}

#[tokio::main]
async fn main() {
    let args = Args::parse();
    println!("{:?}", args);
    let res = reqwest::Client::new()
        // .get("http://ifconfig.me/")
        .get("https://connpass.com/api/v1/event/?ymd=20250114")
        .send()
        .await
        .unwrap();

    println!("{:?}", res.text().await.unwrap());
}
