require "test_helper"

class TrashCalendarControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get trash_calendar_index_url
    assert_response :success
  end
end
