path=$(cd "$(dirname "$0")";pwd)

cd $path/../Sequencer
bash deploy.sh
cd $path
bash clean.sh
