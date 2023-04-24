class AddInterestIdToEvents < ActiveRecord::Migration[6.1]
  def change
    add_column :events, :interest_id, :integer
    add_index :events, :interest_id
  end
end
