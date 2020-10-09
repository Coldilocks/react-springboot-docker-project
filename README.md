


## 1.Docker镜像构建步骤

### 1.1 为SpringBoot项目创建Docker镜像
1. 进入Project-Backend目录；

2. 使用  `mvn clean package` 命令将SpringBoot项目打包成jar包；

3. 在Project-Backend根目录下创建并编写Dockerfile文件，"EXPOSE 8080"表明SpringBoot项目将在8080端口上提供REST API服务；

4. 然后执行 `docker build -t rest-project-backend . ` 为SpringBoot项目创建镜像，其中-t 后面的参数是镜像的名字。



### 1.2为前端项目创建Docker镜像

1. 进入Project-Frontend目录；

2. 执行 `docker build -t rest-project-frontend .` 为React项目创建镜像，该命令会执行Dockerfile，包括构建React项目、修改ngnix的配置、将React项目部署到ngnix中并创建镜像。



### 1.3 使用docker搭建MySQL服务

1. 在终端输入`docker pull mysql:8`拉取官方镜像 
2. 剩余步骤在2.5中继续进行 。



### 1.4 使用docker-compose来管理和运行容器

1. 为了运行本项目，需要创建三个容器（前端、后端以及数据库），所以创建并编写`docker-compose.yml`来管理和运行容器。
2. 在终端输入`docker-compose up` 命令来启动这三个容器。
3. 通过`docker ps`来查看这三个容器是否已经启动。



### 1.5 创建student表

由于MySQL容器是通过docker-compose创建的，此时数据库student_info中还不存在student表，因此需要导入student_info_student.sql文件中的表结构：

1. 在2.4的第3步中查看到数据库容器的名称为project-backend_rest-project-database_1，因此在终端输入`docker exec -it project-backend_rest-project-database_1 mysql -uroot -p`以及密码`123456`来访问数据库。
2. 使用`source student_info_student.sql`命令将脚本文件中的student表结构导入到数据库中（student_info_student.sql文件路径为Project/src/main/resources/student_info_student.sql）。






## 2. 运行与测试

在浏览器中输入`localhost:80`以访问Web应用

