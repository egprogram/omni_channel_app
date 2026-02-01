require "test_helper"

class CouponsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get coupons_index_url
    assert_response :success
  end
end
