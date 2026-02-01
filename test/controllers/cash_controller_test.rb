require "test_helper"

class CashControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get cash_index_url
    assert_response :success
  end
end
