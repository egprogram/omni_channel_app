require "test_helper"

class AiControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get ai_index_url
    assert_response :success
  end
end
