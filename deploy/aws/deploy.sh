docker-machine create -d amazonec2 --amazonec2-region=us-west-2 node1
docker-machine ls
eval $(docker-machine env node1)
env | grep DO

docker-compose -f staging.yml run --rm web bundle exec rails db:migrate

docker tag ff0290878744 424131214300.dkr.ecr.us-east-1.amazonaws.com/brewant_docker
docker push 424131214300.dkr.ecr.us-east-1.amazonaws.com/brewant_docker
