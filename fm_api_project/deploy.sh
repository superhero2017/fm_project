#!/usr/bin/env bash

#using vagrant imgage: boxcutter/centos73

#install python 3.6.2
sudo yum -y install yum-utils
sudo yum-builddep -y python
curl -O https://www.python.org/ftp/python/3.6.2/Python-3.6.2.tgz
tar xzf Python-3.6.2.tgz
cd Python-3.6.2
./configure
make
sudo make install

# install virtualenvwrapper
sudo /usr/local/bin/pip3 install virtualenvwrapper

export VIRTUALENVWRAPPER_PYTHON=`which python3`
echo VIRTUALENVWRAPPER_PYTHON=`which python3` >> ~/.bashrc
echo 'source /usr/local/bin/virtualenvwrapper.sh' >> ~/.bashrc
source /usr/local/bin/virtualenvwrapper.sh

mkvirtualenv feedme
pip install -r requirements.txt

# install postgres
sudo yum install postgresql-server postgresql-contrib
sudo postgresql-setup initdb

sudo vi /var/lib/pgsql/data/pg_hba.conf
# change last column of to host to md5 from ident for 127.0.0.1/32 and ::1/128 addresses

sudo systemctl restart postgresql
sudo systemctl enable postgresql

export DJANGO=dev

