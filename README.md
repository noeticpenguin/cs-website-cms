# CloudSpokes Site with Refinery [![travis-ci](https://travis-ci.org/cloudspokes/cs-website-cms.png)](https://travis-ci.org/cloudspokes/cs-website-cms) [![Code Climate](https://codeclimate.com/badge.png)](https://codeclimate.com/github/cloudspokes/cs-website-cms)

This is the new cloudspokes.com website with Refinery using
the new [CloudSpokes API](https://github.com/cloudspokes/cs-api). 
If you would like to participate in challenges to build out the 
new site, fork this repo and get started!

## Database.com

While our front end is a rails application, most of the datastore and logic resides within our [Database.com org](http://database.com/). You can POST your CloudSpokes membername and password to the https://cs-api-sandbox.herokuapp.com/v1/accounts/authenticate endpoint and it will return an access token that you can use for subsequent calls to our API (passed in the header) or directly to database.com using the [databasedotcom gem](https://github.com/heroku/databasedotcom). There are also a couple of rake tasks that will return an access token for you for testing.

## CloudSpokes API

We will be using our [new API](https://github.com/cloudspokes/cs-api) with this project so please check out the repo for info. There's not a ton of documentation at this time so you may need to check out the source code comments for samples or the specs (using VCR).

If your code is making any "destructive calls" (create, update, delete) with the new API, you will need to pass an API Key in the header of each request. Please email support@cloudspokes.com with the subject "Sandbox API Key Request" and we'll generate a key for you that will be good for all future challenges of this type.

## Environment Variables

If any of your code requires direct calls to Database.com (e.g., pub/sub with faye) then you will need to setup the following environment variables. Please contact support@cloudspokes.com with the subject "Sandbox Envirnmental Variables Request" and we'll send them to you for all future challenges of this type.

	DATABASEDOTCOM_CLIENT_ID
	DATABASEDOTCOM_CLIENT_SECRET
	SFDC_PUBLIC_USERNAME
	SFDC_PUBLIC_PASSWORD

## Local Development

run sqlite3 in development.

	bundle install
	rake db:migrate --trace
	rake db:seed

You can log into Devise/Refinery with the following credentials:

	username: admin
	password: madmin

## Heroku Deployment

Edit the config.yml and specify your endpoints and how long the app will cache the api endpoint responses

Create your app on heroku

	heroku apps:create <my-app>

Setup the databases

	heroku addons:add heroku-postgresql:dev
	heroku run rake db:version
	heroku run rake db:migrate --trace
	heroku run rake db:seed
	heroku restart

Deploy to heroku

	git push heroku master

You can now use the application

	heroku open

## Technical Specifications

Most of the action happens in the class ApiModel (found in app/models). It exposes an ActiveRecord-like DSL that uses the CloudSpokes API as the data source. Many of the ActiveRecord conveniences like #has_many and #column_names have been implemented and slightly modified to adapt as painlessly as possile to the backing API resource.

Note that this is not a 100% completely compatible implementation of ActiveRecord. For example, #belongs_to is not implemented (yet) so there is not an easy way to request the parent object from a collection (e.g. you can easily call challenge.participants but you cannot call as of yet challenge.participants.first.challenge -- there is no linkage in the direction of child to parent). However, based on a quick usage estimate, there is rarely any reason to request a child independent (or without foreknowledge) of its parent and eventually needing to figure out the parent object, so it's not that much pf an issue.

Models descend from ApiModel, which in turn implements the ActiveModel from Rails 4.0 -- this means that along with ActiveRecord DSL capabilities, an ApiModel is also compatible with ActionPack. That also means you can use it with view helpers such as form_for or url_for, simplifying routes.

To create a new model, first inherit from ApiModel and then implement #api_endpoint. Implementing #api_endpoint is important because some relationships that are not in the JSON sent by the api need to be resolved via calling the api. The nodel name is, by convention should be the same as the url endpoint you will be calling to request it (e.g. Participant -> /participants).

You'll then need to list out the attributes (via #attr_accessor) the model should be exposing. We don't have support for typecasting yet, so you'll have to implement your own typecasts as an accessor. For example:

	attr_accessor :start_date

	def start_date
		Date.parse @start_date.to_s if @start_date
	end

Objects are actually a [Hashie::Mash](http://rdoc.info/github/intridea/hashie/Hashie/Mash) giving the ability to do dot-notation calls for the fields.

An example scaffolding has been setup to showcase how easy it is to use the models from a view/controller perspective -- it simply behaves just like any other ActiveRecord object that a Rails developer migth expect.

Not yet implemented:

* Model#create
* Model#update
* Model#update_attributes
* Model#save

## Other

ActiveModel::Model was copied and pasted into app/models because [it will only be available in Rails 4.0](http://blog.plataformatec.com.br/2012/03/barebone-models-to-use-with-actionpack-in-rails-4-0/). If you're interested in implementing a model that is not backed by a database, and yet still responds just like any old ActiveRecord model, you should definitely look at ActiveModel.

## Contributors

* Jeff Douglas -> [jeffdonthemic](https://github.com/jeffdonthemic)
* parasquid -> [parasquid](https://github.com/parasquid)
