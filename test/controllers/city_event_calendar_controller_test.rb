require "test_helper"

class CityEventCalendarControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get city_event_calendar_index_url
    assert_response :success
  end
end
