// This is a manifest file that'll be compiled into application_framework.js, which will include all the files
// listed below.
// It should include the framework/library javascript files which are not supposed to change frequently
//
//= require jquery
//= require jquery_ujs
//= require moment
//= require bootstrap
//= require underscore
//= require handlebars
//= require backbone
//= require backbone-support

//= require curry_app

if (window.jsLoaded) {
  window.jsLoaded.applicationFrameWork = true;
  window.jsLoaded.applicationFrameWorkLoadedTime = new Date();
}
