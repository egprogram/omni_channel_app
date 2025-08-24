require "test_helper"

class RecommendationsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get recommendations_index_url
    assert_response :success
  end
end
