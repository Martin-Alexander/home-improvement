# test/system/products_test.rb
require "application_system_test_case"

class ProductsTest < ApplicationSystemTestCase
  test "visiting the index" do

    # Jerry creates a project
    jerrys_project = Project.create!({
      user: User.where(first_name: "Jerry").first,
      name: "Jerry's Home Improvemnt Project",
      description: '''
        Yes, ChromeDriver uses your local Chrome installation. In case you prefer
         not to upgrade your Chrome installation, you can specify a version of 
         ChromeDiver that would work with the installed Chrome version. You can 
         find the compatible Chrome versions for different ChromeDriver releases 
         at https://chromedriver.storage.googleapis.com/2.25/notes.txt (change 
         2.25 to a newer version if your Chrome version is newer than what is 
         listed there).f your test framework uses the Node.js webdriver-manager, 
         you can simply install the required ChromeDriver version (keeping any 
         already installed versions) using (e.g. for version 2.20):
        ''',
      private: false,
      estimated_level_of_effort: 5,
      status: "started"
    })

    # Jerry can navigate to the edit page and make persistent changes
    login_as users(:jerry)
    visit "/"
    click_link("Jerry's Home Improvemnt Project")
    click_button("Settings")
    fill_in("Name", :with => "Newly Named Project")
    click_button("Update Project")

    # New name is present
    visit project_url(jerrys_project)
    assert_selector "h1", text: "Newly Named Project"

    # George can visit the show page
    login_as users(:george)
    visit "/"
    click_link("Newly Named Project")

    # but sees no settings button
    assert_no_selector("Settings")

    # and gets redirected home if he naviagates to the edit page
    visit edit_project_url(jerrys_project)
    assert_equal root_path, page.current_path
  end
end